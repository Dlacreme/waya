class Friend < ApplicationRecord

  belongs_to :from, class_name: "User", foreign_key: "from_id"
  belongs_to :to, class_name: "User", foreign_key: "to_id"
  belongs_to :friend_status

  attr_accessor :current_user_id

  def friend_profile()
    return self.from.id === @current_user_id ? self.to : self.from
  end

end
