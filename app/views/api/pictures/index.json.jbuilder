# Use Jbuilder to shape the data that is going to be sent from backend to frontend
# It's an object with the picture's ID, title, and photoURL all nested underneath the key of picture ID

@pictures.each do |picture|
  json.set! picture.id do 
    json.extract! picture, :id, :title
    if picture.photo.attached?
      json.photoUrl url_for(picture.photo)
    end
  end
end