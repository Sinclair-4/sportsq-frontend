model Session {
  id String @id @default(uuid())

  name     String
  location String
  startsAt DateTime

  maxPlayers Int?

  scope      SessionScope @default(PRIVATE)
  visibility Visibility   @default(PRIVATE)

  joinCode String @unique

  // Only set when scope = CLUB
  clubId String?
  club   Club? @relation(fields: [clubId], references: [id], onDelete: Cascade)

  players SessionPlayer[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([clubId])
  @@index([startsAt])
  @@index([scope])
}

this is the schema for the session model 