import {
    TextField,
    Button,
    makeStyles,
    createStyles,
    Theme,
    Box,
    Typography
} from '@material-ui/core'
import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',

            '& > *': {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1)
            },
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(4),
                paddingTop: theme.spacing(3),
                border: '1px solid',
                borderColor: theme.palette.divider,
                borderRadius: theme.shape.borderRadius,
                textAlign: 'start',

                '& > *': {
                    margin: theme.spacing(1)
                }
            }
        }
    })
)

export const SignIn: React.FC<Props> = props => {
    const classes = useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [data, loading, error, fetchData] = useFetch()

    const onSubmit = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault()
        if (!username || !password) {
            return alert('please enter all the fields')
        }
    }

    return (
        <Box className={classes.root} component='form' onSubmit={onSubmit}>
            <Typography variant='h4'>Sign In.</Typography>
            <TextField
                label='Username'
                size='small'
                variant='outlined'
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <TextField
                label='Password'
                type='password'
                size='small'
                variant='outlined'
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <Button variant='contained' type='submit' color='primary'>
                Sign In
            </Button>
        </Box>
    )
}
