
## Roles
Role.create(name: "admin")
Role.create(name: "staff")
Role.create(name: "user")

## Admin
User.create(username: "Admin", email: "admin@yana.com", password_digest: "$2a$10$fAxygAFYK/7tImQUphDM3uAk8lv5cnl/bjQ8wtI1nYf9k.SYYj1ay", role_id: 1) #password = toto4242

## User Providers
UserProvider.create(name: "Facebook")
UserProvider.create(name: "Google")