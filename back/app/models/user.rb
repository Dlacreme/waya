class User < ApplicationRecord
  has_secure_password validations: false

  belongs_to :role

  validates :email, presence: true, email: true, uniqueness: true
  validates :username, presence: true

  before_create :process_register

  def self.try_auth(email, password)
    return self.find_by(email: email).try(:authenticate, password)
  end

  def admin?
    return self.role_id == RoleEnum::Admin
  end

  def staff?
    return self.role_id == RoleEnum::Staff
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