class UserController < ApplicationController

  def index
    data User
      .all
      .as_json(
        methods: :picture_url
      )
  end

  def search
    data User
    .where("username LIKE '%?%' or '%?%'", params[:query], params[:query])
    .as_json(
      methods: :picture_url
    )
  end

  def search_by_role
    data User
      .where(role_id: params[:role_id])
      .as_json(
      methods: :picture_url
    )
  end

  def show
    logged_in?
    id = params[:id]
    id = @current_user.id if params[:id] == "0"

    data load(id)
  end

  def create
    ps = param_create
    user = User.create(email: ps[:email], username: ps[:email], role_id: RoleEnum::User)
    user.save
    data User.find_by(email: ps[:email]).as_json
  end

  def update
    process_form UserUpdateForm.new(User.find(params[:id])), param_update
    data load(params[:id])
  end

  def picture
    u = User.find(params[:id])
    u.picture = params[:file]
    u.save
    data load(params[:id])
  end

  def update_role
    process_form UserRoleForm.new(User.find(params[:id])), param_update_role
    data User.find(params[:id])
  end

  def destroy
  end

private

  def load(id)
    User
      .find(id)
      .as_json(
        methods: :picture_url
      )
  end

  def param_create
    params.require(:user).permit(:email)
  end

  def param_update
    params.permit(:email, :username, :password, :credit)
  end

  def param_update_role
    params.permit(:role_id)
  end

end
