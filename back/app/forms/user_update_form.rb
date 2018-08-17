class UserUpdateForm < Reform::Form

  property :email
  property :password
  property :username

  validates_uniqueness_of :email

end