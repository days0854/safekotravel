import React, { useState, useEffect, useRef } from 'react';
import { TourPackage, ContentBlock } from '../types';
import { dataService } from '../services/dataService';
import { ProductDetailView } from '../components/ProductDetailView';
import { Plus, Edit, Trash2, Save, X, Lock, Image as ImageIcon, Type, AlignLeft, Eye, EyeOff, ChevronUp, ChevronDown, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<TourPackage[]>([]);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content'>('basic');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const [currentProduct, setCurrentProduct] = useState<Partial<TourPackage>>({});

  // Categories
  const categories = [
    { value: 'general', label: 'General / Uncategorized' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'nightlife', label: 'Safe Nightlife' },
    { value: 'religious', label: 'Religious Freedom' },
    { value: 'dmz', label: 'DMZ Tours' },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const loadProducts = () => {
    setProducts(dataService.getProducts());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleEdit = (product: TourPackage) => {
    setCurrentProduct(JSON.parse(JSON.stringify(product))); // Deep copy
    setActiveTab('basic');
    setIsPreviewMode(false);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      id: Date.now().toString(),
      title: 'New Travel Story',
      location: 'Seoul',
      price: 50,
      rating: 5,
      reviews: 0,
      imageUrl: 'https://picsum.photos/800/600',
      tags: [],
      category: 'general',
      description: '',
      contentBlocks: []
    });
    setActiveTab('basic');
    setIsPreviewMode(false);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dataService.deleteProduct(id);
      loadProducts();
    }
  };

  const handleSave = () => {
    if (currentProduct.title && currentProduct.id) {
      if (typeof currentProduct.tags === 'string') {
        currentProduct.tags = (currentProduct.tags as string).split(',').map((t: string) => t.trim());
      }
      try {
        dataService.saveProduct(currentProduct as TourPackage);
        setIsEditorOpen(false);
        loadProducts();
      } catch (e) {
        alert("Storage full! Try using smaller images.");
      }
    } else {
        alert("Title is required");
    }
  };

  // --- Image Upload Logic ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        callback(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Content Block Logic ---

  // Insert a block at a specific index (to allow inserting in the middle)
  const insertBlock = (index: number, type: 'header' | 'paragraph' | 'image') => {
    const newBlock: ContentBlock = {
      id: Date.now().toString() + Math.random().toString(),
      type,
      value: ''
    };
    const updatedBlocks = [...(currentProduct.contentBlocks || [])];
    updatedBlocks.splice(index, 0, newBlock);
    setCurrentProduct({ ...currentProduct, contentBlocks: updatedBlocks });
  };

  // Add block to the end
  const addBlockToEnd = (type: 'header' | 'paragraph' | 'image') => {
    const blocks = currentProduct.contentBlocks || [];
    insertBlock(blocks.length, type);
  };

  const updateBlock = (index: number, field: keyof ContentBlock, value: string) => {
    const updatedBlocks = [...(currentProduct.contentBlocks || [])];
    updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
    setCurrentProduct({ ...currentProduct, contentBlocks: updatedBlocks });
  };

  const removeBlock = (index: number) => {
    const updatedBlocks = [...(currentProduct.contentBlocks || [])];
    updatedBlocks.splice(index, 1);
    setCurrentProduct({ ...currentProduct, contentBlocks: updatedBlocks });
  };
  
  const moveBlock = (index: number, direction: 'up' | 'down') => {
      const blocks = [...(currentProduct.contentBlocks || [])];
      if (direction === 'up' && index > 0) {
          [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
      } else if (direction === 'down' && index < blocks.length - 1) {
          [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
      }
      setCurrentProduct({ ...currentProduct, contentBlocks: blocks });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Lock className="text-white w-6 h-6" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">CMS Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-rose-600 transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* CMS Header */}
      <div className="bg-slate-900 text-white px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-primary mr-2">Safeko</span> CMS
        </h1>
        <div className="flex items-center space-x-4">
           {isEditorOpen && (
              <div className="flex bg-slate-800 rounded-lg p-1">
                <button 
                  onClick={() => setIsPreviewMode(false)}
                  className={`flex items-center px-3 py-1.5 text-xs font-medium rounded transition-all ${!isPreviewMode ? 'bg-white text-slate-900' : 'text-gray-400 hover:text-white'}`}
                >
                  <Edit className="w-3 h-3 mr-1.5" /> Edit
                </button>
                <button 
                  onClick={() => setIsPreviewMode(true)}
                  className={`flex items-center px-3 py-1.5 text-xs font-medium rounded transition-all ${isPreviewMode ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {isPreviewMode ? <EyeOff className="w-3 h-3 mr-1.5" /> : <Eye className="w-3 h-3 mr-1.5" />} Preview
                </button>
              </div>
           )}
           <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white">
            Logout
           </button>
        </div>
      </div>

      {/* Main List View */}
      {!isEditorOpen && (
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Manage Travel Packages</h2>
            <button onClick={handleAddNew} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center font-medium hover:bg-rose-600 transition-colors shadow-sm">
              <Plus className="w-5 h-5 mr-1" /> Add New Package
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Content</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Category</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Price</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 mb-1">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                        product.category === 'beauty' ? 'bg-pink-100 text-pink-700' :
                        product.category === 'dmz' ? 'bg-orange-100 text-orange-700' :
                        product.category === 'religious' ? 'bg-purple-100 text-purple-700' :
                        product.category === 'nightlife' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {product.category || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor View */}
      {isEditorOpen && (
        <div className="bg-gray-100 min-h-screen flex flex-col">
          
          {/* Editor Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm sticky top-16 z-40">
            <div className="flex items-center space-x-4">
               <button onClick={() => setIsEditorOpen(false)} className="text-gray-500 hover:text-slate-800">
                  <X className="w-6 h-6" />
               </button>
               <h3 className="text-lg font-bold text-slate-800">
                 {currentProduct.id ? 'Editing Story' : 'New Story'}
               </h3>
               <div className="h-6 w-px bg-gray-300 mx-2"></div>
               {/* Quick Add Toolbar for Blog Mode */}
               {activeTab === 'content' && !isPreviewMode && (
                 <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-gray-400 uppercase mr-2">Quick Add:</span>
                    <button onClick={() => addBlockToEnd('header')} className="p-2 hover:bg-gray-100 rounded text-slate-600" title="Add Header">
                      <Type className="w-5 h-5" />
                    </button>
                    <button onClick={() => addBlockToEnd('paragraph')} className="p-2 hover:bg-gray-100 rounded text-slate-600" title="Add Text">
                      <AlignLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => addBlockToEnd('image')} className="p-2 hover:bg-gray-100 rounded text-slate-600" title="Add Image">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                 </div>
               )}
            </div>
            
            <button onClick={handleSave} className="flex items-center px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-rose-600 transition-colors shadow-sm">
                <Save className="w-4 h-4 mr-2" /> Save
            </button>
          </div>

          {/* Editor Body */}
          <div className="flex-grow overflow-y-auto">
            {isPreviewMode ? (
              <div className="bg-gray-100 min-h-full py-8">
                 <div className="max-w-7xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-white">
                    <ProductDetailView product={currentProduct as TourPackage} isPreview={true} />
                 </div>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto py-8 px-4">
                
                {/* Tabs */}
                <div className="flex justify-center mb-8">
                   <div className="bg-white p-1 rounded-full shadow-sm border border-gray-200 flex">
                     <button 
                       onClick={() => setActiveTab('basic')}
                       className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'basic' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                     >
                       1. Basic Info
                     </button>
                     <button 
                       onClick={() => setActiveTab('content')}
                       className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                     >
                       2. Write Content
                     </button>
                   </div>
                </div>

                {activeTab === 'basic' ? (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto space-y-6">
                      <div className="border-b border-gray-100 pb-4 mb-4">
                         <h3 className="text-xl font-bold text-slate-800">Basic Information</h3>
                         <p className="text-sm text-gray-400">Set the cover image, price, and basic details.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tour Title</label>
                        <input
                          required
                          type="text"
                          value={currentProduct.title || ''}
                          onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                          placeholder="e.g. Secret Garden & Nami Island Day Trip"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                            <select
                                value={currentProduct.category || 'general'}
                                onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value as any})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white"
                            >
                              {categories.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                         </div>
                         <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                           <input
                             type="text"
                             value={currentProduct.location || ''}
                             onChange={(e) => setCurrentProduct({...currentProduct, location: e.target.value})}
                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                             placeholder="e.g. Seoul, Jeju"
                           />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Price ($)</label>
                           <input
                             type="number"
                             value={currentProduct.price || 0}
                             onChange={(e) => setCurrentProduct({...currentProduct, price: parseInt(e.target.value)})}
                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                           />
                         </div>
                         <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Discount %</label>
                           <input
                             type="number"
                             value={currentProduct.discount || ''}
                             onChange={(e) => setCurrentProduct({...currentProduct, discount: parseInt(e.target.value)})}
                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                           />
                         </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Cover Image</label>
                        <div className="space-y-3">
                           {/* File Upload for Cover */}
                           <div className="flex items-center gap-3">
                              <label className="flex items-center px-4 py-2 bg-gray-100 text-slate-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                 <Upload className="w-4 h-4 mr-2" />
                                 <span>Upload File</span>
                                 <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload(e, (base64) => setCurrentProduct({...currentProduct, imageUrl: base64}))}
                                 />
                              </label>
                              <span className="text-gray-400 text-sm">or</span>
                              <input
                                 type="text"
                                 value={currentProduct.imageUrl || ''}
                                 onChange={(e) => setCurrentProduct({...currentProduct, imageUrl: e.target.value})}
                                 className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                 placeholder="Paste Image URL"
                              />
                           </div>
                           
                           {currentProduct.imageUrl && (
                              <div className="mt-3 w-full h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                 <img src={currentProduct.imageUrl} className="w-full h-full object-cover" alt="Cover Preview" />
                              </div>
                           )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Description (Summary)</label>
                        <textarea
                          rows={3}
                          value={currentProduct.description || ''}
                          onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tags</label>
                        <input
                          type="text"
                          value={Array.isArray(currentProduct.tags) ? currentProduct.tags.join(', ') : currentProduct.tags || ''}
                          onChange={(e) => setCurrentProduct({...currentProduct, tags: e.target.value.split(',')})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                          placeholder="Nature, Healing, Best Seller"
                        />
                      </div>
                  </div>
                ) : (
                  // BLOG CONTENT EDITOR
                  <div className="max-w-3xl mx-auto space-y-2 pb-20">
                     
                     <div className="text-center mb-8">
                       <h3 className="text-2xl font-bold text-slate-800">{currentProduct.title || 'Untitled Story'}</h3>
                       <p className="text-gray-400">Add text and images below to tell the full story.</p>
                     </div>

                     {/* Content Blocks */}
                     {currentProduct.contentBlocks?.map((block, index) => (
                       <React.Fragment key={block.id}>
                         
                         {/* Interstitial Insert Button */}
                         <div className="h-4 group relative flex items-center justify-center my-1 cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                               <div className="bg-slate-800 text-white text-xs rounded-full shadow-lg flex items-center p-1 px-2 space-x-2 transform scale-90 group-hover:scale-100 transition-transform">
                                  <span className="font-bold mr-1">Insert:</span>
                                  <button onClick={() => insertBlock(index, 'header')} className="hover:bg-slate-700 p-1 rounded" title="Header"><Type className="w-3 h-3"/></button>
                                  <button onClick={() => insertBlock(index, 'paragraph')} className="hover:bg-slate-700 p-1 rounded" title="Text"><AlignLeft className="w-3 h-3"/></button>
                                  <button onClick={() => insertBlock(index, 'image')} className="hover:bg-slate-700 p-1 rounded" title="Image"><ImageIcon className="w-3 h-3"/></button>
                               </div>
                            </div>
                            <div className="w-full h-px bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>

                         {/* The Block */}
                         <div className="bg-white p-4 rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all relative group/block">
                            
                            {/* Side Controls */}
                            <div className="absolute -right-12 top-2 flex flex-col space-y-1 opacity-0 group-hover/block:opacity-100 transition-opacity">
                               <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1.5 bg-white text-gray-400 hover:text-slate-800 rounded-full shadow border border-gray-100"><ChevronUp className="w-3 h-3" /></button>
                               <button onClick={() => moveBlock(index, 'down')} disabled={index === (currentProduct.contentBlocks?.length || 0) - 1} className="p-1.5 bg-white text-gray-400 hover:text-slate-800 rounded-full shadow border border-gray-100"><ChevronDown className="w-3 h-3" /></button>
                               <button onClick={() => removeBlock(index)} className="p-1.5 bg-white text-red-400 hover:text-red-600 rounded-full shadow border border-gray-100"><Trash2 className="w-3 h-3" /></button>
                            </div>

                            {/* Block Content */}
                            {block.type === 'header' && (
                               <input 
                                  type="text" 
                                  placeholder="Heading..."
                                  value={block.value}
                                  onChange={(e) => updateBlock(index, 'value', e.target.value)}
                                  className="w-full text-2xl font-bold border-none focus:ring-0 outline-none placeholder-gray-300 bg-transparent"
                               />
                            )}

                            {block.type === 'paragraph' && (
                               <textarea 
                                  rows={Math.max(2, block.value.split('\n').length)}
                                  placeholder="Type your story here..."
                                  value={block.value}
                                  onChange={(e) => updateBlock(index, 'value', e.target.value)}
                                  className="w-full text-base leading-relaxed border-none focus:ring-0 outline-none placeholder-gray-300 bg-transparent resize-none overflow-hidden"
                               />
                            )}

                            {block.type === 'image' && (
                               <div className="space-y-2">
                                  {block.value ? (
                                    <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-100 relative">
                                      <img src={block.value} alt="Preview" className="w-full h-auto max-h-[400px] object-contain mx-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                  ) : (
                                    <div className="w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                                       <ImageIcon className="w-8 h-8 mb-2" />
                                       <span className="text-sm">No Image Set</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex gap-2">
                                     <label className="flex items-center justify-center px-3 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 text-sm text-slate-600 flex-shrink-0">
                                       <Upload className="w-4 h-4" />
                                       <input 
                                          type="file" 
                                          accept="image/*" 
                                          className="hidden" 
                                          onChange={(e) => handleImageUpload(e, (base64) => updateBlock(index, 'value', base64))}
                                       />
                                     </label>
                                     <input 
                                       type="text" 
                                       placeholder="Or paste Image URL here..."
                                       value={block.value}
                                       onChange={(e) => updateBlock(index, 'value', e.target.value)}
                                       className="w-full text-sm p-2 bg-gray-50 rounded border border-gray-200 focus:border-primary outline-none"
                                     />
                                  </div>
                                  
                                  <input 
                                    type="text" 
                                    placeholder="Image Caption (Optional)"
                                    value={block.caption || ''}
                                    onChange={(e) => updateBlock(index, 'caption', e.target.value)}
                                    className="w-full text-xs text-center border-none bg-transparent focus:ring-0 placeholder-gray-300"
                                  />
                               </div>
                            )}
                         </div>
                       </React.Fragment>
                     ))}

                     {/* Initial Add Button (if empty) */}
                     {(!currentProduct.contentBlocks || currentProduct.contentBlocks.length === 0) && (
                        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                           <p className="text-gray-400 mb-4">Start telling your story</p>
                           <div className="flex justify-center space-x-4">
                              <button onClick={() => addBlockToEnd('header')} className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-slate-700 text-sm font-medium"><Type className="w-4 h-4 mr-2"/> Heading</button>
                              <button onClick={() => addBlockToEnd('paragraph')} className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-slate-700 text-sm font-medium"><AlignLeft className="w-4 h-4 mr-2"/> Text</button>
                              <button onClick={() => addBlockToEnd('image')} className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-slate-700 text-sm font-medium"><ImageIcon className="w-4 h-4 mr-2"/> Image</button>
                           </div>
                        </div>
                     )}
                     
                     {/* Bottom Add Area */}
                     {currentProduct.contentBlocks && currentProduct.contentBlocks.length > 0 && (
                        <div className="pt-8 flex justify-center opacity-50 hover:opacity-100 transition-opacity">
                             <div className="flex bg-white shadow-sm border border-gray-200 rounded-full p-1">
                                <button onClick={() => addBlockToEnd('paragraph')} className="p-2 hover:bg-gray-100 rounded-full text-slate-500" title="Add Paragraph"><Plus className="w-5 h-5" /></button>
                             </div>
                        </div>
                     )}

                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
