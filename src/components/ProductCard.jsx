import { Link } from 'react-router-dom'

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.image1}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-0 absolute top-0 left-0"
        />
        <img
          src={product.image2}
          alt={`${product.name} hover`}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500 mb-2">Rs. {product.price}</p>

        <div className="flex gap-2">
          <Link
            to={`/edit/${product.id}`}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
