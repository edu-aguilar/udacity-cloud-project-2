import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../util/util';
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    const { image_url : imageUrl } = req.query

    const isValidUrl = (url: string) => new URL(url)

    if (!imageUrl) {
      res.status(400).send('missing params')
    }

    try {
      isValidUrl(imageUrl)
    } catch (error) {
      res.status(400).send('invalid URL')
    }

    filterImageFromURL(imageUrl)
      .then(filteredImagePath => {
        res.status(200).sendFile(filteredImagePath)
        // deleteLocalFiles([filteredImagePath])
      })
      .catch(err => {
        res.status(403).send('Image url is not valid')
      })
});

export const ImageRouter: Router = router;