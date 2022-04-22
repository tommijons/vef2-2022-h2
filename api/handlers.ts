import Router from "next/router"

export const eydaHandler = async ( id:number, token:String ) => {
    const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/menu/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
        },
    })
  
    if(result.status === 401) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    alert("Vöru eytt")
    Router.reload()
  }
  
export const breytaHandler = async (
  id: number,
  title: string,
  price: string,
  description: string,
  category: string,
  image: any,
  token: String
) => {
  const formData = new FormData();
  if (title) formData.append('title', title);
  if (price) formData.append('price', price);
  if (description) formData.append('description', description);
  if (category) formData.append('category', category);
  if (image !== undefined) {
    formData.append('image', image);
  }
  const result = await fetch(
    `https://vef2-2022-h1-synilausn.herokuapp.com/menu/${id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  alert("Vöru breytt")
  Router.reload()
};


export const eydaHandlerCategory = async ( id:number, token:String ) => {
  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
      },
  })

  if(result.status === 401) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  alert("Flokki eytt")
  Router.reload()
}

export const breytaHandlerCategory = async ( id: number, title: String, token: String ) => {
  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
    body: JSON.stringify({ title }),
  })
  alert("Flokki breytt")
  Router.reload()
}
