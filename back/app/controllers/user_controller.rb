class UserController < ApplicationController

  def index
    data User
      .all
      .as_json()
  end

  def search
    data User
    .where("username LIKE '%?%' or '%?%'", params[:query], params[:query])
    .as_json
  end

  def search_by_role
    data User
      .where(role_id: params[:role_id])
      .as_json
  end

  def show
    data User
      .find(params[:id])
  end

  def create
    ps = param_create
    user = User.create(email: ps[:email], username: ps[:email], role_id: RoleEnum::User)
    user.save
    data User.find_by(email: ps[:email]).as_json
  end

  def update
    process_form UserUpdateForm.new(User.find(params[:id])), param_update
    data User.find(params[:id])
  end

  def destroy

  end

private

  def param_create
    params.require(:user).permit(:email)
  end

  def param_update
    params.permit(:email, :username, :password)
  end

end
