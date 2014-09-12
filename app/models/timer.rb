class Timer < ActiveRecord::Base
  validates_uniqueness_of :pattern

  has_many :user_timers
  has_many :users, through: :user_timers
end
