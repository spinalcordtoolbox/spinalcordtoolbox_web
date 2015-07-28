categories = [
  id: 1
  name: "films"
,
  id: 2
  name: "musiques"
 ]

app
  .service "categoryProvider", ->
    @getCategories= ->
      categories
    @getName= ->
      categories[0].name
    null