import {gql} from '@apollo/client'

export const GET_USERS = gql`

query ($name:String, $page:Int){
  characters( page:$page, filter: { name: $name } ) {
    info{
      pages
    }
    results {
      name
      status
      species
      gender
      image
      id
      location{
        name
      }
    }
  }
}

`

