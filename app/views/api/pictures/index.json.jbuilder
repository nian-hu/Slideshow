# Shape the data that is going to be sent from backend to frontend
# An object with the picture's ID, title, and photoURL all nested underneath key of picture ID

@pictures.each do |picture|
  json.set! picture.id do 
    json.extract! picture, :id, :title
    if picture.photo.attached?
      json.photoUrl picture.photo
    end
  end
end