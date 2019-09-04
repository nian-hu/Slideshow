# == Schema Information
#
# Table name: pictures
#
#  id         :bigint           not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Picture < ApplicationRecord
  has_one_attached :photo
end
