landingResponse= async (req,res) => {
  res
  .send({
    message: 'Hello, this is the API that I made for the shopify Summer 2021 Intern Challenge! If you need help with using this API please contact me at lenakwan@gmail.com'
  })
}
module.export={
landingResponse: landingResponse
}