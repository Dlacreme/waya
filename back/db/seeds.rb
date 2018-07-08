
## Roles
Role.create(name: "admin")
Role.create(name: "staff")
Role.create(name: "user")

## Admin
User.create(username: "Admin", email: "admin@yana.com", password_digest: "$2a$10$fAxygAFYK/7tImQUphDM3uAk8lv5cnl/bjQ8wtI1nYf9k.SYYj1ay", role_id: 1) #password = toto4242

## User Providers
UserProvider.create(name: "Facebook")
UserProvider.create(name: "Google")

## Stocks
StockUnit.create(name: 'NA')
StockUnit.create(name: 'cl')
StockUnit.create(name: 'g')

StockFormat.create(name: 'Can', stock_unit_id: 2)
StockFormat.create(name: 'Bottle', stock_unit_id: 2)
StockFormat.create(name: 'Box', stock_unit_id: 3)

StockType.create(name: 'Mixtures')
StockType.create(name: 'Finished Product')

## Products
ProductCategory.create(name: 'Drink')
ProductCategory.create(name: 'Alcohol')
ProductCategory.create(name: 'Food')
ProductCategory.create(name: 'Combo')