class SigninForm < Reform::Form
    
  property :email
  property :password
  property :username

  validates :email,       presence: true, email: true
  validates :password,    presence: true
  validates :username,        presence: true

  def save(type_id = RoleEnum::User)
    sync
    if !model.valid?
      return false
    end

    model.roles << Role.find(type_id)
    model.save
  end

end