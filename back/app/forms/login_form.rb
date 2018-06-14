class LoginForm < Reform::Form
  property :email
  property :password

  validates :email,       presence: true, email: true
  validates :password,    presence: true
end