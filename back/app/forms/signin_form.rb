class SigninForm < Reform::Form
    
  property :email
  property :password
  property :username

  validates :email,       presence: true, email: true
  validates :password,    presence: true
  validates :username,    presence: true

  validates_uniqueness_of :email

  def save(type_id = RoleEnum::User)
    sync

    model.role_id = type_id
    if !model.valid?
      return false
    end
    model.save
  end

end