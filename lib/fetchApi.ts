const API_URL = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        return response.ok;
    } catch {
        return false;
    }
}

async function getRefreshPromise(): Promise<boolean> {
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;

    refreshPromise = refreshAccessToken();

    try {
        return await refreshPromise;
    } finally {
        isRefreshing = false;
        refreshPromise = null;
    }
}

export async function fetchApi(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const url = `${API_URL}/${endpoint}`;

    // Create one Request so it can safely be cloned for retries.
    const request = new Request(url, {
        ...options,
        credentials: "include",
    });

    // First request
    let response = await fetch(request.clone());

    // Access token is still valid.
    if (response.status !== 401) {
        return response;
    }

    /*
     * Access token is expired/invalid.
     *
     * If another request is already refreshing the token,
     * wait for that refresh instead of starting another one.
     */
    const refreshed = await getRefreshPromise();

    /*
     * Refresh failed.
     *
     * The refresh token is probably expired/invalid.
     * Return the original 401 response so the caller can
     * handle the unauthenticated state.
     */
    if (!refreshed) {
        return response;
    }

    /*
     * Refresh succeeded.
     *
     * Retry the original request with the new access token.
     */
    response = await fetch(request.clone());

    return response;
}