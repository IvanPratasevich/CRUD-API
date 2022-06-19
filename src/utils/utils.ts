import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../interfaces/interfaces';
import { version } from 'uuid';
import { validate } from 'uuid';

export const uuidValidate = (id: string): boolean => {
  return validate(id) && version(id) === 4;
};

export const getReqData = (req: IncomingMessage, res: ServerResponse): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    try {
      let body: string = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Internal error' }));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
