const mongoose = require('mongoose');
const { Item } = require('../Model/itemModel');
const converter = require('json-2-csv')
const fs = require('fs')

// read JSON from a file

module.exports.downloadCSV = async (req, res) => {
    try {
        const item = await Item.find();
        const csv = await converter
            .json2csvAsync(item)
            .then(csv => {
            
                fs.writeFile('item.csv', csv, (err) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).send('Internal server error');
                    }
            
                    res.download('item.csv', (err) => {
                      if (err) {
                        console.error(err);
                        return res.status(500).send('Internal server error');
                      }
            
                      fs.unlink('item.csv', (err) => {
                        if (err) {
                          console.error(err);
                        }
                      });
                    });
                  });
            })
            .catch(err => console.log(err))

            
        // return res.json({ message: 'Get Item List successfully', item: item });
    } catch (error) {
        console.log('error', error)
    }
}

