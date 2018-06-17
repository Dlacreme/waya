class LoginProviderForm < Reform::Form
  property :email
  property :username
  property :password
  property :provider_id
  property :user_provider_id
  property :token

  validates :email,       presence: true, email: true
end