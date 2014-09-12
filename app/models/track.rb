class Track < ActiveRecord::Base
  validates_uniqueness_of :url

  has_many :user_tracks
  has_many :users, through: :user_tracks
end
