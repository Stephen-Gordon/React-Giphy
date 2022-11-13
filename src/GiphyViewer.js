import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';

const GIPHY_URL = 'https://api.giphy.com/v1/gifs';
const API_KEY = 'kVIuneqNzkRNZgfWZ3v8vUrJip1ZrhB1';

const GiphyViewer = () => {
    const [gifs, setGifs] = useState([]);
    const [term, setTerm] = useState ([""]);

    
    useEffect(() => {
        axios.get(`${GIPHY_URL}/trending?api_key=${API_KEY}&limit=50`)
             .then(response => {
                console.log(response.data.data);
                setGifs(response.data.data);
             })
             .catch(error => console.log(error));
    }, []);


    const searchGif = () => {
        axios.get(`${GIPHY_URL}/search?api_key=${API_KEY}&limit=50&q=${term}`)
        .then(response => {
            console.log(response.data.data);
            setGifs(response.data.data);
         })
         .catch(error => console.log(error));
         setTerm("")
    }

    const trendingGif = () => {
        axios.get(`${GIPHY_URL}/trending?api_key=${API_KEY}&limit=50`)
        .then(response => {
            console.log(response.data.data);
            setGifs(response.data.data);
         })
         .catch(error => console.log(error)); 
    }

    const randomGif = () => {
        axios.get(`${GIPHY_URL}/random?api_key=${API_KEY}&limit=50`)
        .then(response => {
            console.log(response.data.data);
            setGifs([response.data.data]);
         })
         .catch(error => console.log(error)); 
    }


    const handleDropdownOne = (e) => {
        console.log(e.target.value)
    }

    const handleTrendingClick = (e) => {
        trendingGif();
    }
    
    const handleRandomClick = (e) => {
        randomGif();
    }

    const handleChange = (e) => {
        setTerm(e.target.value)
    }

    
    const handleClick = (e) => {
        searchGif();
    }
    

    const handleKeyUp = (e) => {
        if(e.key === 'Enter'){
            searchGif();
        }
    };


    const gifComponents = gifs.map((g) => {
        return <GIFCard key={g.id} image={g.images.fixed_width.url} title={g.title} url={g.url} />;
    });

    return (
        <>
            <Container>

           
            <Row className='mt-5 mb-5'>
            <div>
                    <h2 className='display-5 mb-3 fw-semibold 1h-sm'>Giphy <span className='text-blue'>Api</span></h2>
            </div>
                <div className='lead fw-normal mt-5'>
                    <p>This App connects to Gipfy's Api and their differnet endpoints.</p>
                    <p>The connection is made using the useEffect React Hook and the data stored in a State variable.</p>
                    <p>The user can then search, choose a random or trending Gif using the Api parameters.</p>
                </div>
            </Row>

            
            

                <Row className='mb-5 d-flex flex-row'>
                    <Col className='d-flex' sm='12 mt-3' lg='6 d-flex' >
                        <input type="text" className='form' value={term} onChange={handleChange} onKeyUp={handleKeyUp} />
                        <Button variant='primary' className='ps-3 pe-5 add' onClick={handleClick}>Search</Button>
                    </Col>
                  
                    <Col lg='3 d-flex mt-0 ' className=''>
                        <Col className='d-flex flex-column flex-fill' sm='6 mt-3 me-4'>
                            <Button className='todobutton' onClick={handleTrendingClick}>Trending</Button>
                        </Col>

                        <Col className='d-flex flex-column flex-fill' sm='6 mt-3'>
                            <Button className='todobutton' onClick={handleRandomClick}>Random</Button>
                        </Col>
                    </Col>
                </Row>
            


                <Row xs={1} lg={4} md={3} className="g-4">
                    {gifComponents}
                </Row>
            </Container>
        </>
    );
};

const GIFCard = (props) => {
    return (
        <Col>
        <a href={props.url} target="_blank">
        <div className='card-gif'>
        <img className='gif-img'  variant='top' src={props.image}></img>
            <div>
                <h3 className='p-3'>{props.title} </h3>
            </div>
        </div>
        </a>
        </Col>
    );
};

export default GiphyViewer;