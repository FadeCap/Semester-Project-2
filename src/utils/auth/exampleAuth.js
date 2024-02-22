const options = {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
    }
  }
   
  const response = await fetch(`${API_BASE_URL}/auction/listings`, options)
  const data = await response.json()