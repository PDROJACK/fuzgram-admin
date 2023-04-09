import requests

# Replace with your own access token
access_token = "YOUR_ACCESS_TOKEN_HERE"

# URL endpoint for recent posts
url = f"https://api.instagram.com/v1/users/self/media/recent/?access_token={access_token}"

# Make a GET request to the API endpoint
response = requests.get(url)

# Extract the JSON data from the response
data = response.json()

# Print the caption and image URL for each post
for post in data['data']:
    caption = post['caption']['text']
    image_url = post['images']['standard_resolution']['url']
    print(caption)
    print(image_url)