import Head from 'next/head';
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Grid, Card, Typography } from '@mui/material';
import styles from '../../styles/Categories.module.css'
import Header from '../../components/Header.js'

const Category = ({ meals }) => {
  const router = useRouter();
  const {category} = router.query; 

  return (
    <>
        <Head>
            <title> {category} | Recipes App</title>
            <meta name="description" content="Homepage of the Recipes application" />
        </Head>

        <Header />
        <main className={styles.main}>
          <Typography variant='h3'>Meals </Typography>

            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1} sx = {{flex: "wrap"}}>
              {
                meals.map((meal) => 
                  <Grid item key={meal.idMeal} >
                    <Card variant='outlined' className={styles.card}>
                      <Grid container direction='column' justifyContent='center' alignItems='center' >
                        <Grid item 
                          className={styles.imgContainer}
                        >
                          <Image 
                            src = {meal.strMealThumb} 
                            alt={meal.strMeal} 
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant='body1'>
                            {meal.strMeal}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )
              }
            </Grid>

        </main>

    </>
  )
}

export async function getStaticPaths() {
  const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')).json();
  const mealCategories = data.categories;

  var categoryPaths = [];
  for (let i = 0; i < mealCategories.length; i++ ) {
    categoryPaths.push({params: {category: mealCategories[i].strCategory}})
  }

  return {
    paths: categoryPaths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`)).json();
  const meals = data.meals;
  
  return {
    props: {
      meals,
    }
  }
}

export default Category;