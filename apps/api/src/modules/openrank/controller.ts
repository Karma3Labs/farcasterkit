import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

const allowedStrategies = ['follows', 'engagement', 'activity', 'og_circles', 'og_engagement', 'og_activity'];

router.post('/rankings', async (req, res) => {
  try {
    let { strategy, limit, offset } = req.body;

    if (strategy && !allowedStrategies.find((a) => a === strategy)) {
      res.status(400).json({ msg: `incorrect strategy ${strategy}. please choose one from [${allowedStrategies.join(", ")}]` });
      return;
    } else if (!strategy) {
      strategy = 'follows';
    }

    let url = `https://api.cast.k3l.io/rankings?strategy=${strategy}`;
    if (limit) {
      url = `${url}&limit=${limit}`;
    }
    if (offset) {
      url = `${url}&offset=${offset}`;
    }

    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /rankings route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/ranking_index', async (req, res) => {
  try {
    let { strategy, username } = req.body;

    if (!username) {
      res.status(400).json({ msg: `username is required` });
      return;
    }
    if (strategy && !allowedStrategies.find((a) => a === strategy)) {
      res.status(400).json({ msg: `incorrect strategy ${strategy}. please choose one from [${allowedStrategies.join(", ")}]` });
      return;
    } else if (!strategy) {
      strategy = 'follows';
    }

    let url = `https://api.cast.k3l.io/ranking_index?strategy=${strategy}&username=${username}`;
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /ranking_index route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/links/engagement/handles', async (req, res) => {
  try {
    let handles = req.body;
    let { limit } = req.query;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let limitVal = 100;
    if (limit && typeof limit === 'number' && limit > 0 && limit <= 100) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/links/engagement/handles?limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /links/engagement/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/links/following/handles', async (req, res) => {
  try {
    let handles = req.body;
    let { limit } = req.query;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let limitVal = 100;
    if (limit && typeof limit === 'number' && limit > 0 && limit <= 100) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/links/following/handles?limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /links/following/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/links/engagement/fids', async (req, res) => {
  try {
    let fids = req.body;
    let { limit } = req.query;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let limitVal = 100;
    if (limit && typeof limit === 'number' && limit > 0 && limit <= 100) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/links/engagement/fids?limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /links/engagement/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/links/following/fids', async (req, res) => {
  try {
    let fids = req.body;
    let { limit } = req.query;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let limitVal = 100;
    if (limit && typeof limit === 'number' && limit > 0 && limit <= 100) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/links/following/fids?limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /links/following/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/graph/neighbors/engagement/handles', async (req, res) => {
  try {
    let { handles, k, limit } = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/graph/neighbors/engagement/handles?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /graph/neighbors/engagement/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/graph/neighbors/following/handles', async (req, res) => {
  try {
    let { handles, k, limit } = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/graph/neighbors/following/handles?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /graph/neighbors/following/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/personalized/engagement/handles', async (req, res) => {
  try {
    let { handles, k, limit } = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/personalized/engagement/handles?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /score/personalized/engagement/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/personalized/following/handles', async (req, res) => {
  try {
    let { handles, k, limit } = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/personalized/following/handles?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /score/personalized/following/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/graph/neighbors/engagement/addresses', async (req, res) => {
  try {
    let { addresses, k, limit } = req.body;

    if (!addresses || addresses.length === 0) {
      res.status(400).json({ msg: `addresses is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/graph/neighbors/engagement/addresses?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(addresses),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /graph/neighbors/engagement/addresses route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/graph/neighbors/following/addresses', async (req, res) => {
  try {
    let { addresses, k, limit } = req.body;

    if (!addresses || addresses.length === 0) {
      res.status(400).json({ msg: `addresses is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/graph/neighbors/following/addresses?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(addresses),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /graph/neighbors/following/addresses route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/personalized/engagement/addresses', async (req, res) => {
  try {
    let { addresses, k, limit } = req.body;

    if (!addresses || addresses.length === 0) {
      res.status(400).json({ msg: `addresses is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/personalized/engagement/addresses?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(addresses),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/personalized/engagement/addresses route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/personalized/following/addresses', async (req, res) => {
  try {
    let { addresses, k, limit } = req.body;

    if (!addresses || addresses.length === 0) {
      res.status(400).json({ msg: `addresses is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/personalized/following/addresses?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(addresses),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/personalized/following/addresses route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/graph/neighbors/engagement/fids', async (req, res) => {
  try {
    let { fids, k, limit } = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/graph/neighbors/engagement/fids?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /graph/neighbors/engagement/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/graph/neighbors/following/fids', async (req, res) => {
  try {
    let { fids, k, limit } = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/graph/neighbors/following/fids?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /graph/neighbors/following/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/personalized/engagement/fids', async (req, res) => {
  try {
    let { fids, k, limit } = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/personalized/engagement/fids?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/personalized/engagement/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/personalized/following/fids', async (req, res) => {
  try {
    let { fids, k, limit } = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let kVal = 2;
    if (k && k > 0) {
      kVal = k;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/personalized/following/fids?k=${kVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/personalized/following/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/metadata/handles', async (req, res) => {
  try {
    const handles = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/metadata/handles`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /metadata/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/metadata/fids', async (req, res) => {
  try {
    const fids = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/metadata/fids`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /metadata/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/metadata/addresses/fids', async (req, res) => {
  try {
    const fids = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/metadata/addresses/fids`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /metadata/addresses/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/metadata/addresses', async (req, res) => {
  try {
    const addresses = req.body;

    if (!addresses || addresses.length === 0) {
      res.status(400).json({ msg: `addresses is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/metadata/addresses`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(addresses),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /metadata/addresses route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/metadata/addresses/handles', async (req, res) => {
  try {
    const handles = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/metadata/addresses/handles`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /metadata/addresses/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/global/following/rankings', async (req, res) => {
  try {
    let { offset, limit } = req.body;


    let offsetVal = 0;
    if (offset && offset > 0) {
      offsetVal = offset;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/global/following/rankings?offset=${offsetVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/global/following/rankings route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/global/engagement/rankings', async (req, res) => {
  try {
    let { offset, limit } = req.body;


    let offsetVal = 0;
    if (offset && offset > 0) {
      offsetVal = offset;
    }

    let limitVal = 100;
    if (limit && limit > 0) {
      limitVal = limit;
    }

    let url = `https://graph.cast.k3l.io/scores/global/engagement/rankings?offset=${offsetVal}&limit=${limitVal}`;
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/global/engagement/rankings route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/global/following/fids', async (req, res) => {
  try {
    let fids = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/scores/global/following/fids`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/global/following/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/global/following/handles', async (req, res) => {
  try {
    let handles = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/scores/global/following/handles`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/global/following/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/global/engagement/fids', async (req, res) => {
  try {
    let fids = req.body;

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/scores/global/engagement/fids`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/global/engagement/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/scores/global/engagement/handles', async (req, res) => {
  try {
    let handles = req.body;

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/scores/global/engagement/handles`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /scores/global/engagement/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

/*
https://graph.cast.k3l.io/docs#/
Given a list of input fids, return a list of frame urls used by the extended trust network of the input fids.

This API takes four optional parameters - agg, weights, k and limit.

Parameter 'agg' is used to define the aggregation function and can take any of the following values - rms, sumsquare, sum

Parameter 'weights' is used to define the weights to be assigned to like, cast and recast actions by profiles. L1C10R5

Parameter 'details' is used to specify whether the original cast list should be returned for each frame in the ranking.

(Note: cast hashes and warpcast urls are returned in chronological order ie., oldest first) (NOTE: details=True will result in a few extra hundred milliseconds in response times).
(NOTE: the API returns upto a max of 100 cast hashes and 100 warpcast urls when details=True).

Parameter 'voting' is used to decide whether there is a single vote per neighbor or multiple votes per neigbor when deriving the frames score.

Parameter 'k' is used to constrain the social graph to k-degrees of separation.

By default, agg=rms, weights='L1C10R5', voting='single', k=2 and limit=100.
*/

router.post('/frames/global/rankings', async (req, res) => {
  try {
    let { agg, weights, voting, k, limit, details } = req.query;

    if (!(agg && ['rms', 'sumsquare', 'sum'].includes(agg as string))) {
      agg = 'rms'
    }

    if (!(weights && /^L\d+C\d+R\d+$/.test(weights as string))) {
      weights = 'L1C10R5'
    }

    if (!(voting && ['single', 'multiple'].includes(voting as string))) {
      voting = 'single'
    }

    if (!(k && typeof k === 'number' && k > 0 && k < 6)) {
      k = "2"
    }

    if (!(limit && typeof limit === 'number' && limit > 0)) {
      limit = "100"
    }
    let url = `https://graph.cast.k3l.io/frames/global/rankings?agg=${agg}&weights=${weights}&voting=${voting}&k=${k}&limit=${limit}&details=${details ? 'true' : 'false'}`;
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /frames/global/rankings route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/frames/personalized/rankings/fids', async (req, res) => {
  try {
    let fids = req.body;
    let { agg, weights, voting, k, limit } = req.query;

    if (!(agg && ['rms', 'sumsquare', 'sum'].includes(agg as string))) {
      agg = 'rms'
    }

    if (!(weights && /^L\d+C\d+R\d+$/.test(weights as string))) {
      weights = 'L1C10R5'
    }

    if (!(voting && ['single', 'multiple'].includes(voting as string))) {
      voting = 'single'
    }

    if (!(k && typeof k === 'number' && k > 0 && k < 6)) {
      k = "2"
    }

    if (!(limit && typeof limit === 'number' && limit > 0)) {
      limit = "100"
    }

    if (!fids || fids.length === 0) {
      res.status(400).json({ msg: `fids is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/frames/personalized/rankings/fids?agg=${agg}&weights=${weights}&voting=${voting}&k=${k}&limit=${limit}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(fids),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /frames/personalized/rankings/fids route:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/frames/personalized/rankings/handles', async (req, res) => {
  try {
    let handles = req.body;
    let { agg, weights, voting, k, limit } = req.query;

    if (!(agg && ['rms', 'sumsquare', 'sum'].includes(agg as string))) {
      agg = 'rms'
    }

    if (!(weights && /^L\d+C\d+R\d+$/.test(weights as string))) {
      weights = 'L1C10R5'
    }

    if (!(voting && ['single', 'multiple'].includes(voting as string))) {
      voting = 'single'
    }

    if (!(k && typeof k === 'number' && k > 0 && k < 6)) {
      k = "2"
    }

    if (!(limit && typeof limit === 'number' && limit > 0)) {
      limit = "100"
    }

    if (!handles || handles.length === 0) {
      res.status(400).json({ msg: `handles is required` });
      return;
    }

    let url = `https://graph.cast.k3l.io/frames/personalized/rankings/handles?agg=${agg}&weights=${weights}&voting=${voting}&k=${k}&limit=${limit}`;
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: JSON.stringify(handles),
    });

    const apiResult = await apiResponse.json();

    if (apiResponse.ok) {
      res.status(200).json(apiResult);
    } else {
      res.status(apiResponse.status).json(apiResult);
    }
  } catch (error) {
    console.error('Error in /frames/personalized/rankings/handles route:', error);
    res.status(500).send('Internal Server Error');
  }
});

export const OpenRank = router;
