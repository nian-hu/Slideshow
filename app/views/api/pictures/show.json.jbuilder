json.set! @picture.id do 
  json.extract! @picture, :id, :title
  if @picture.photo.attached?
    json.photoUrl url_for(@picture.photo)
  end
end
