# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

Picture.destroy_all

################
### PICTURES ###
################

picture1 = Picture.create!(title: "First picture")
photo1 = open('https://bubble-test-seeds.s3.amazonaws.com/bubble-test-photo.jpg')
picture1.photo.attach(io: photo1, filename: 'bubble-test-photo.jpg')

picture2 = Picture.create!(title: "Second picture")
photo2 = open('https://bubble-test-seeds.s3.amazonaws.com/bubble-test-photo-2.jpg')
picture2.photo.attach(io: photo2, filename: 'bubble-test-photo-2.jpg')

picture3 = Picture.create!(title: "Third picture")
photo3 = open('https://bubble-test-seeds.s3.amazonaws.com/bubble-test-photo-3.jpg')
picture3.photo.attach(io: photo3, filename: 'bubble-test-photo-3.jpg')