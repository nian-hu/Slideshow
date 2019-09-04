@pictures.each do |picture|
  json.set! picture.id do 
    json.extract! picture, :id, :title
    if picture.photo.attached?
      json.photoUrl picture.photo
    end
  end
end