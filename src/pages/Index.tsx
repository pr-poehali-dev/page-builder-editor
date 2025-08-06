import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface Element {
  id: string;
  type: 'text' | 'button' | 'image' | 'video' | 'social';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  styles: {
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    fontWeight?: string;
    borderRadius?: number;
    opacity?: number;
  };
}

const BuildEditor = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [draggedElementType, setDraggedElementType] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const elementTypes = [
    { type: 'text', icon: 'Type', label: 'Текст' },
    { type: 'button', icon: 'MousePointer', label: 'Кнопка' },
    { type: 'image', icon: 'Image', label: 'Изображение' },
    { type: 'video', icon: 'Play', label: 'Видео' },
    { type: 'social', icon: 'Share2', label: 'Соцсети' },
  ];

  const handleDragStart = (elementType: string) => {
    setDraggedElementType(elementType);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElementType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: Element = {
      id: `${draggedElementType}-${Date.now()}`,
      type: draggedElementType as Element['type'],
      content: getDefaultContent(draggedElementType),
      x,
      y,
      width: getDefaultWidth(draggedElementType),
      height: getDefaultHeight(draggedElementType),
      styles: getDefaultStyles(draggedElementType),
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
    setDraggedElementType(null);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text': return 'Новый текст';
      case 'button': return 'Кнопка';
      case 'image': return 'https://via.placeholder.com/200x150';
      case 'video': return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      case 'social': return 'Discord';
      default: return '';
    }
  };

  const getDefaultWidth = (type: string) => {
    switch (type) {
      case 'text': return 200;
      case 'button': return 120;
      case 'image': return 200;
      case 'video': return 320;
      case 'social': return 40;
      default: return 100;
    }
  };

  const getDefaultHeight = (type: string) => {
    switch (type) {
      case 'text': return 30;
      case 'button': return 40;
      case 'image': return 150;
      case 'video': return 180;
      case 'social': return 40;
      default: return 50;
    }
  };

  const getDefaultStyles = (type: string) => {
    switch (type) {
      case 'text':
        return { fontSize: 16, color: '#ffffff', fontWeight: 'normal' };
      case 'button':
        return { backgroundColor: '#6E48EB', color: '#ffffff', borderRadius: 8 };
      case 'image':
        return { borderRadius: 8, opacity: 1 };
      case 'video':
        return { borderRadius: 8 };
      case 'social':
        return { backgroundColor: '#6E48EB', borderRadius: 8, opacity: 1 };
      default:
        return {};
    }
  };

  const updateElementStyles = (key: string, value: any) => {
    if (!selectedElement) return;
    
    const updatedElement = {
      ...selectedElement,
      styles: { ...selectedElement.styles, [key]: value }
    };
    
    setSelectedElement(updatedElement);
    setElements(elements.map(el => 
      el.id === selectedElement.id ? updatedElement : el
    ));
  };

  const updateElementContent = (content: string) => {
    if (!selectedElement) return;
    
    const updatedElement = { ...selectedElement, content };
    setSelectedElement(updatedElement);
    setElements(elements.map(el => 
      el.id === selectedElement.id ? updatedElement : el
    ));
  };

  const renderElement = (element: Element) => {
    const style = {
      position: 'absolute' as const,
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      cursor: 'pointer',
      border: selectedElement?.id === element.id ? '2px solid #6E48EB' : 'none',
      ...element.styles,
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={style}
            onClick={() => setSelectedElement(element)}
            className="animate-fade-in flex items-center justify-center"
          >
            {element.content}
          </div>
        );
      case 'button':
        return (
          <Button
            key={element.id}
            style={style}
            onClick={() => setSelectedElement(element)}
            className="animate-scale-in"
          >
            {element.content}
          </Button>
        );
      case 'image':
        return (
          <img
            key={element.id}
            src={element.content}
            alt="Element"
            style={style}
            onClick={() => setSelectedElement(element)}
            className="animate-fade-in object-cover"
          />
        );
      case 'video':
        return (
          <iframe
            key={element.id}
            src={element.content}
            style={style}
            onClick={() => setSelectedElement(element)}
            className="animate-scale-in"
            frameBorder="0"
          />
        );
      case 'social':
        return (
          <div
            key={element.id}
            style={style}
            onClick={() => setSelectedElement(element)}
            className="animate-scale-in flex items-center justify-center rounded-lg"
          >
            <Icon name="Share2" size={20} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-background text-foreground dark flex">
      {/* Левая панель - Элементы */}
      <div className="w-64 border-r border-border bg-card p-4 animate-slide-in-right">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Элементы</h2>
          <div className="grid grid-cols-1 gap-2">
            {elementTypes.map(({ type, icon, label }) => (
              <Card
                key={type}
                className="p-3 cursor-pointer hover:bg-accent transition-colors duration-200 border-border hover:scale-105 transform"
                draggable
                onDragStart={() => handleDragStart(type)}
              >
                <div className="flex items-center gap-2">
                  <Icon name={icon as any} size={16} className="text-primary" />
                  <span className="text-sm">{label}</span>
                </div>
              </Card>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Быстрые действия</h3>
            <Button size="sm" className="w-full justify-start">
              <Icon name="Save" size={14} className="mr-2" />
              Сохранить
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start">
              <Icon name="Eye" size={14} className="mr-2" />
              Предпросмотр
            </Button>
          </div>
        </div>
      </div>

      {/* Центральная рабочая область */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Редактор билдов</h1>
            <div className="flex gap-2">
              <Badge variant="secondary" className="animate-fade-in">
                {elements.length} элементов
              </Badge>
              <Button size="sm" className="hover:scale-105 transition-transform">
                <Icon name="Download" size={14} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </div>
        
        <div
          ref={canvasRef}
          className="flex-1 relative bg-background overflow-hidden"
          onDrop={handleCanvasDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(110, 72, 235, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          {elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center animate-fade-in">
                <Icon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Перетащите элементы сюда</p>
                <p className="text-sm">Начните создавать свой билд</p>
              </div>
            </div>
          )}
          
          {elements.map(renderElement)}
        </div>
      </div>

      {/* Правая панель - Настройки */}
      <div className="w-80 border-l border-border bg-card p-4 animate-slide-in-right">
        {selectedElement ? (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Icon name="Settings" size={16} className="text-primary" />
              <h2 className="font-semibold">Настройки элемента</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Содержимое</Label>
                {selectedElement.type === 'text' || selectedElement.type === 'button' ? (
                  <Input
                    value={selectedElement.content}
                    onChange={(e) => updateElementContent(e.target.value)}
                    className="mt-2"
                  />
                ) : (
                  <Textarea
                    value={selectedElement.content}
                    onChange={(e) => updateElementContent(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                )}
              </div>

              {selectedElement.type === 'text' && (
                <>
                  <div>
                    <Label>Размер шрифта: {selectedElement.styles.fontSize}px</Label>
                    <Slider
                      value={[selectedElement.styles.fontSize || 16]}
                      onValueChange={(value) => updateElementStyles('fontSize', value[0])}
                      min={8}
                      max={72}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Цвет текста</Label>
                    <Input
                      type="color"
                      value={selectedElement.styles.color || '#ffffff'}
                      onChange={(e) => updateElementStyles('color', e.target.value)}
                      className="mt-2 h-10"
                    />
                  </div>
                </>
              )}

              {selectedElement.type === 'button' && (
                <div>
                  <Label>Цвет фона</Label>
                  <Input
                    type="color"
                    value={selectedElement.styles.backgroundColor || '#6E48EB'}
                    onChange={(e) => updateElementStyles('backgroundColor', e.target.value)}
                    className="mt-2 h-10"
                  />
                </div>
              )}

              <div>
                <Label>Скругление углов: {selectedElement.styles.borderRadius || 0}px</Label>
                <Slider
                  value={[selectedElement.styles.borderRadius || 0]}
                  onValueChange={(value) => updateElementStyles('borderRadius', value[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Прозрачность: {Math.round((selectedElement.styles.opacity || 1) * 100)}%</Label>
                <Slider
                  value={[(selectedElement.styles.opacity || 1) * 100]}
                  onValueChange={(value) => updateElementStyles('opacity', value[0] / 100)}
                  min={0}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>

            <Button
              variant="destructive"
              size="sm"
              className="w-full mt-6"
              onClick={() => {
                setElements(elements.filter(el => el.id !== selectedElement.id));
                setSelectedElement(null);
              }}
            >
              <Icon name="Trash2" size={14} className="mr-2" />
              Удалить элемент
            </Button>
          </div>
        ) : (
          <div className="text-center text-muted-foreground animate-fade-in">
            <Icon name="Hand" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Выберите элемент</p>
            <p className="text-sm">для редактирования</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildEditor;