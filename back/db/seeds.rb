## Admin
User.create(username: "Admin", email: "admin@yana.com", password_digest: "$2a$10$fAxygAFYK/7tImQUphDM3uAk8lv5cnl/bjQ8wtI1nYf9k.SYYj1ay") #password = toto4242

## Roles
Role.create(name: "admin")
Role.create(name: "staff")
Role.create(name: "user")

UserRole.create(user_id: 1, role_id: 1)

## User Providers
UserProvider.create(name: "Facebook")
UserProvider.create(name: "Google")