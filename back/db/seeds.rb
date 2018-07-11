
## Roles
Role.create(name: "admin")
Role.create(name: "staff")
Role.create(name: "user")

## Admin
User.create(username: "Admin", email: "admin@yana.com", password_digest: "$2a$10$fAxygAFYK/7tImQUphDM3uAk8lv5cnl/bjQ8wtI1nYf9k.SYYj1ay", role_id: 1) #password = toto4242

## Tables
Table.create(name: 'La 1')
Table.create(name: 'La 2')
Table.create(name: 'La triplette')

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

## Orders
PaymentMethod.create(name: 'Credit Card')
PaymentMethod.create(name: 'Cash')
PaymentMethod.create(name: 'Credit')

OrderStatus.create(name: 'Pending')
OrderStatus.create(name: 'Validated')
OrderStatus.create(name: 'Cancelled')
OrderStatus.create(name: 'Ready')
OrderStatus.create(name: 'Delivered')
OrderStatus.create(name: 'Paid')

OrderAction.create(name: 'Create')
OrderAction.create(name: 'Update')
OrderAction.create(name: 'Comment')
OrderAction.create(name: 'Validated')
OrderAction.create(name: 'Cancel')
OrderAction.create(name: 'Ready')
OrderAction.create(name: 'Delivered')
OrderAction.create(name: 'Paid')

## Voucher
VoucherType.create(name: "Percentage")
VoucherType.create(name: "Fix")