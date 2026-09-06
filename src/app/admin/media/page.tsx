import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { readJsonStore } from '@/lib/jsonStore';
import { Download, Copy, Image as ImageIcon, FileText } from 'lucide-react';

export default function MediaLibraryPage() {
  const mediaFiles = readJsonStore<any>('media.json').sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Media Library <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{mediaFiles.length} Files</span>
        </h1>
        <p className="text-sm text-gray-500">All uploaded images and PDFs are stored here safely in Node.js JSON storage.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        {mediaFiles.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No media uploaded yet. Start by uploading images or PDFs in the product/collection sections.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {mediaFiles.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg overflow-hidden group bg-gray-50 hover:shadow-md transition-shadow">
                <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
                  {file.type === 'application/pdf' ? (
                    <FileText className="w-16 h-16 text-red-500" />
                  ) : (
                    <img 
                      src={file.url} 
                      alt={file.filename}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-orange-600 transition-colors"
                      title="Copy Link"
                      // Since we are in a server component, we need to use a client side wrapper for copy, 
                      // but we can just provide a direct anchor tag or a small JS script snippet
                    >
                      <Copy size={18} />
                    </button>
                    <a 
                      href={file.url} 
                      download={file.filename}
                      target="_blank"
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-orange-600 transition-colors"
                      title="Download"
                    >
                      <Download size={18} />
                    </a>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-700 truncate" title={file.filename}>{file.filename}</p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase flex justify-between">
                    <span>{file.type.split('/')[1] || 'FILE'}</span>
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
