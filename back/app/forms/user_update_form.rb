class UserUpdateForm < Reform::Form

  property :email
  property :password
  property :username
  property :credit

  validates_uniqueness_of :email

end