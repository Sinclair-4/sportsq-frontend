import React from "react"

export default function TypographyPage() {
    return (
        <main className="container mx-auto max-w-4xl px-6 py-12">
            <article className="space-y-12">
                {/* Title */}
                <section className="space-y-4">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Typography
                    </h1>

                    <p className="text-xl text-muted-foreground">
                        A collection of typography styles commonly used with shadcn/ui.
                    </p>
                </section>

                {/* Headings */}
                <section className="space-y-6">
                    <div>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                            Headings
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Different heading levels for structuring your content.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                                Heading 1
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                text-4xl font-extrabold tracking-tight
                            </p>
                        </div>

                        <div>
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                                Heading 2
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                text-3xl font-semibold tracking-tight
                            </p>
                        </div>

                        <div>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Heading 3
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                text-2xl font-semibold tracking-tight
                            </p>
                        </div>

                        <div>
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Heading 4
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                text-xl font-semibold tracking-tight
                            </p>
                        </div>
                    </div>
                </section>

                {/* Paragraph */}
                <section className="space-y-6">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Paragraphs
                    </h2>

                    <div className="space-y-4">
                        <p className="leading-7">
                            This is a standard paragraph. Typography should make content
                            comfortable to read while providing a clear hierarchy between
                            different pieces of information.
                        </p>

                        <p className="leading-7">
                            A second paragraph demonstrates spacing between blocks of text.
                            The <strong className="font-semibold">strong element</strong>{" "}
                            provides emphasis, while{" "}
                            <em className="italic">italic text</em> provides a softer form
                            of emphasis.
                        </p>
                    </div>
                </section>

                {/* Lead */}
                <section className="space-y-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Lead
                    </h2>

                    <p className="text-xl text-muted-foreground">
                        This is a lead paragraph. It is useful for introducing a page or
                        section with slightly larger and softer text.
                    </p>
                </section>

                {/* Large / Small / Muted */}
                <section className="space-y-6">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Text Variations
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <p className="text-lg font-semibold">
                                Large text
                            </p>
                            <p className="text-sm text-muted-foreground">
                                text-lg font-semibold
                            </p>
                        </div>

                        <div>
                            <p className="text-base">
                                Default text
                            </p>
                            <p className="text-sm text-muted-foreground">
                                text-base
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium">
                                Small text
                            </p>
                            <p className="text-sm text-muted-foreground">
                                text-sm font-medium
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Muted text
                            </p>
                            <p className="text-sm text-muted-foreground">
                                text-sm text-muted-foreground
                            </p>
                        </div>
                    </div>
                </section>

                {/* Links */}
                <section className="space-y-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Links
                    </h2>

                    <p className="leading-7">
                        This is an example of a{" "}
                        <a
                            href="#"
                            className="font-medium text-primary underline underline-offset-4"
                        >
                            styled link
                        </a>
                        {" "}within a paragraph.
                    </p>
                </section>

                {/* Blockquote */}
                <section className="space-y-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Blockquote
                    </h2>

                    <blockquote className="mt-6 border-l-2 pl-6 italic">
                        “Good typography is invisible. Great typography makes the content
                        feel effortless to read.”
                    </blockquote>
                </section>

                {/* Lists */}
                <section className="space-y-6">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Lists
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="mb-4 text-xl font-semibold">
                                Unordered List
                            </h3>

                            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                <li>Typography creates hierarchy</li>
                                <li>Spacing improves readability</li>
                                <li>Contrast establishes importance</li>
                                <li>Consistency improves usability</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-xl font-semibold">
                                Ordered List
                            </h3>

                            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                                <li>Choose your heading</li>
                                <li>Add supporting content</li>
                                <li>Establish visual hierarchy</li>
                                <li>Review the final result</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* Inline Code */}
                <section className="space-y-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Inline Code
                    </h2>

                    <p className="leading-7">
                        You can use{" "}
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                            npm install
                        </code>{" "}
                        to install dependencies.
                    </p>
                </section>

                {/* Code Block */}
                <section className="space-y-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Code Block
                    </h2>

                    <pre className="overflow-x-auto rounded-lg border bg-muted p-4">
                        <code className="font-mono text-sm">
                            {`const greeting = "Hello, world!"

console.log(greeting)`}
                        </code>
                    </pre>
                </section>

                {/* Table */}
                <section className="space-y-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Table
                    </h2>

                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="h-12 px-4 text-left font-medium">
                                        Component
                                    </th>
                                    <th className="h-12 px-4 text-left font-medium">
                                        Size
                                    </th>
                                    <th className="h-12 px-4 text-left font-medium">
                                        Weight
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b">
                                    <td className="p-4 font-medium">Heading 1</td>
                                    <td className="p-4 text-muted-foreground">4xl</td>
                                    <td className="p-4 text-muted-foreground">800</td>
                                </tr>

                                <tr className="border-b">
                                    <td className="p-4 font-medium">Heading 2</td>
                                    <td className="p-4 text-muted-foreground">3xl</td>
                                    <td className="p-4 text-muted-foreground">600</td>
                                </tr>

                                <tr>
                                    <td className="p-4 font-medium">Body</td>
                                    <td className="p-4 text-muted-foreground">base</td>
                                    <td className="p-4 text-muted-foreground">400</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Combined Example */}
                <section className="space-y-6">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Complete Example
                    </h2>

                    <div className="space-y-4">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Building a Design System
                        </h3>

                        <p className="text-xl text-muted-foreground">
                            A good design system provides consistency across your entire
                            application.
                        </p>

                        <p className="leading-7">
                            Design systems aren't only about colors and components.{" "}
                            <strong className="font-semibold">
                                Typography is equally important
                            </strong>{" "}
                            because it determines how users consume and understand your
                            content.
                        </p>

                        <blockquote className="border-l-2 pl-6 italic">
                            Consistency is one of the most important principles of good UI
                            design.
                        </blockquote>

                        <ul className="ml-6 list-disc [&>li]:mt-2">
                            <li>Use consistent heading sizes</li>
                            <li>Maintain readable line heights</li>
                            <li>Use muted text for secondary information</li>
                        </ul>

                        <p className="text-sm text-muted-foreground">
                            Last updated today · Typography guidelines
                        </p>
                    </div>
                </section>
            </article>
        </main>
    )
}