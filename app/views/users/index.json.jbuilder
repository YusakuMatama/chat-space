json.array! @users do |user|
  json.name user.name
  json.id user.id
  json.group user.groups.name

end