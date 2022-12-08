import { Amplify, API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';


const myAPI = 'projectsApi'
const path = '/projects'

const Projects = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        API.get(myAPI, path).then(res => {
            setProjects(JSON.stringify(res))
            console.log('res :>> ', res);
        }).catch(err => {
            console.log('err :>> ', err);
        })
    }, [])

    const postData = () => {
        API.post(myAPI, path, {}).then(res => {
            console.log('post res :>> ', res);
        }).catch(err => {
            console.log('post err :>> ', err);
        })
    }


    return (
        <>

            <div>Projects {projects}</div>
            <button onClick={postData}>Post</button>
        </>
    )
}

export default Projects