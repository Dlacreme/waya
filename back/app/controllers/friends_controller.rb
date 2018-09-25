class FriendsController < ApplicationController

  def index
    logged_in?
    friends = Friend.where('from_id = ? OR to_id = ?', @current_user.id, @current_user.id)
      .includes([:from, :to])

    friends.each do |x|
      x.current_user_id = @current_user.id
    end

    data friends.as_json(methods: :friend_profile)
  end

  def create
    logged_in?
    friend = Friend.new
    friend.from_id = @current_user.id
    friend.to_id = get_param(:user_id)
    friend.friend_status_id = 1
    friend.save
    data load(friend.id)
  end

  def update
    friend = Friend.find(params[:id])
    friend.friend_status_id = 2
    friend.save
    ok
  end

  def destroy
    Friend.delete(params[:id]);
    ok
  end

private

  def load(friend_id)
    friend = Friend.find(friend_id)
    friend.current_user_id = @current_user.id
    friend.as_json(methods: :friend_profile)
  end

  def get_param(param_name)
    params.permit(param_name)[param_name]
  end

end
