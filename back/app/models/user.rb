class User < ApplicationRecord
  has_secure_password validations: false

  has_many :user_roles
  has_many :roles, through: :user_roles

  validates :email, presence: true, email: true, uniqueness: true
  validates :username, presence: true

  before_create :process_register

  # Auth
  def role?(role)
    roles.any? {|r| r.name.underscore.to_sym == role}
  end

  def self.try_auth(email, password)
    return self.find_by(email: email).try(:authenticate, password)
  end

  def output()
    self
      .attributes
      .except("password_digest")
      .except("provider_id")
      .except("user_provider_id")
  end

  private
  def process_register
    p "Should send confirmation email here."
  end
end