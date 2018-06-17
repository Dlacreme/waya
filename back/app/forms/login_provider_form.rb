class LoginProviderForm < Reform::Form

  attr_accessor :user_id
  attr_accessor :email
  attr_accessor :username
  attr_accessor :provider_id
  attr_accessor :user_provider_id
  attr_accessor :token
  attr_accessor :model

  def validate(params)
    p "PARAAAAMS"
    p params
    return false unless params[:email] && params[:username] && params[:provider_id] && params[:user_provider_id] && params[:token]
    self.email = params[:email]
    self.username = params[:username]
    self.provider_id = params[:provider_id]
    self.user_provider_id = params[:user_provider_id]
    self.token = params[:token]
    true
  end

  def save(type_id = RoleEnum::User)
    if User.exists?(email: self.email)
      self.user_id = User.select('id').find_by(email: self.email).id
    else
      insert_user(type_id) unless User.exists?(email: self.email)
    end
    return revert_transaction if save_provider_history != true
    true
  end

  def prepopulate!
    self.model = User.find(self.user_id)
  end

private

  def insert_user(type_id)
    user = User.new
    user.username = self.username
    user.email = self.email
    user.role_id = type_id
    if !user.valid?
      return false
    end
    user.save
    self.user_id = user.id
  end

  def save_provider_history
    provider_history = UserProviderHistory.new
    provider_history.user_id = self.id
    provider_history.user_provider_id = self.user_provider_id
    provider_history.provider_id = self.provider_id
    provider_history.token = self.token
    provider_history.save
  end

  def revert_transaction
    User.destroy_all(self.user_id)
    false
  end
end