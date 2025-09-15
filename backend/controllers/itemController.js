import itemModal from "../modals/itemModal.js";


export const createItem = async ( req, res, next) =>{
    try {
        const { name, description, category, price, rating, hearts} = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const total = Number(price) * 1;

        const newItem = new itemModal({
            name,
            description,
            category,
            price,
            rating,
            hearts,
            imageUrl,
            total
        })

        const saved = await newItem.save();
        res.status(201).json(saved)
    } 
    catch (err) {
      if( err.code === 11000) {
         return res.status(400).json({ message: 'Item name already exists'})
      }  
      next(err); 
    }
}

//Get function to get all items
 export const getItems = async (_req, res , next) => {
    try {
         const items = await itemModal.find().sort({ createdAt: -1 });
         const host = `${_req.protocol}://${_req.get('host')}`;

        //  const host = `${_req.portocol}://${_req.get('host')}`;

        //  const withFullUrl = itemModal.applyTimestamps( i => ({
            const withFullUrl = items.map(i => ({
             ...i.toObject(),
             imageUrl: i.imageUrl ? host + i.imageUrl : '',
         }))
         res.json(withFullUrl)
    } 
    catch (err) {
        next(err);
    }
 }

// Delete function to Delete items
export const deleteItem = async ( req, res, next) =>{
     try {
         const removed = await itemModal.findByIdAndDelete(req.params.id);
         if( !removed) return res.status(404).json({ message: "Item not found"})
            res.status(204).end()
     } catch (err) {
        next(err);
     }
}