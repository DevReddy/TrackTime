class UserTimer < ActiveRecord::Base
  belongs_to :user
  belongs_to :timer
end
