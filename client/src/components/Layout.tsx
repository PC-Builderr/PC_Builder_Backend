import { Container, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'

interface Props {
    children: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }
    })
)

export const Layout: React.FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <header></header>
            <Container component='main' className={classes.main} maxWidth='lg'>
                {props.children}
            </Container>
            <footer></footer>
        </>
    )
}
