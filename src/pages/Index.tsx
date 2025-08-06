import React, { useState } from 'react';
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

interface BuildData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  launchDate: string;
  steamLink: string;
  videoUrl: string;
  backgroundImage: string;
  contentBlockStyle: {
    backgroundColor: string;
    opacity: number;
    borderRadius: number;
  };
}

const BuildEditor = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [buildData, setBuildData] = useState<BuildData>({
    title: 'The DRIFTER',
    subtitle: 'Chapter 1 Demo',
    description: 'A Pulp Adventure Thriller - A murdered drifter awakens. Alive again, seconds before his death. Hunted and haunted, help him untangle a mad web of conspiracy in this fast-paced point \'n click thrill-ride.\n\nPlay Chapter 1 here on Itch...',
    features: [
      'A Pulp Adventure Thriller from the minds that brought you Peridium and Crawl',
      'An engrossing roller-coaster of a story- Drawing on King, Hitchcock and Lynch'
    ],
    launchDate: 'LAUNCHES JULY 17',
    steamLink: 'Then check out the full game on Steam!',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    backgroundImage: '/img/626ccac7-1a87-40fd-8e28-ef0e37110edc.jpg',
    contentBlockStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      opacity: 0.9,
      borderRadius: 12
    }
  });

  const elementTypes = [
    { type: 'title', icon: 'Heading1', label: 'Заголовок' },
    { type: 'subtitle', icon: 'Heading2', label: 'Подзаголовок' },
    { type: 'description', icon: 'FileText', label: 'Описание' },
    { type: 'features', icon: 'List', label: 'Особенности' },
    { type: 'video', icon: 'Play', label: 'Видео' },
    { type: 'button', icon: 'MousePointer', label: 'Кнопка' },
    { type: 'background', icon: 'Image', label: 'Фон страницы' },
    { type: 'contentBlock', icon: 'Square', label: 'Блок описания' },
  ];

  const updateBuildData = (key: keyof BuildData, value: any) => {
    setBuildData(prev => ({ ...prev, [key]: value }));
  };

  const updateContentBlockStyle = (key: string, value: any) => {
    setBuildData(prev => ({
      ...prev,
      contentBlockStyle: { ...prev.contentBlockStyle, [key]: value }
    }));
  };

  const renderPreview = () => (
    <div 
      className="w-full h-full relative overflow-auto"
      style={{
        backgroundImage: `url(${buildData.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content overlay */}
      <div className="min-h-full p-8 flex">
        {/* Left content block */}
        <div 
          className="w-1/2 p-8 text-white animate-fade-in"
          style={{
            backgroundColor: buildData.contentBlockStyle.backgroundColor,
            opacity: buildData.contentBlockStyle.opacity,
            borderRadius: buildData.contentBlockStyle.borderRadius,
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => setSelectedElement('contentBlock')}
        >
          {/* Title */}
          <h1 
            className="text-6xl font-bold text-red-500 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); setSelectedElement('title'); }}
          >
            {buildData.title}
          </h1>

          {/* Subtitle */}
          <h2 
            className="text-xl text-red-400 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); setSelectedElement('subtitle'); }}
          >
            – {buildData.subtitle} –
          </h2>

          {/* Description */}
          <p 
            className="text-gray-300 mb-6 leading-relaxed cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); setSelectedElement('description'); }}
          >
            {buildData.description}
          </p>

          {/* Steam link */}
          <p 
            className="text-red-400 mb-4 cursor-pointer hover:opacity-80 transition-opacity underline"
            onClick={(e) => { e.stopPropagation(); setSelectedElement('steamLink'); }}
          >
            {buildData.steamLink}
          </p>

          {/* Launch date */}
          <p 
            className="text-red-500 font-bold text-lg mb-8 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); setSelectedElement('launchDate'); }}
          >
            – {buildData.launchDate} –
          </p>

          {/* Features section */}
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); setSelectedElement('features'); }}
          >
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Features</h3>
            <ul className="space-y-2 text-gray-300">
              {buildData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right media section */}
        <div className="w-1/2 p-8 flex flex-col gap-6">
          {/* Video */}
          <div 
            className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform animate-scale-in"
            onClick={() => setSelectedElement('video')}
          >
            <iframe
              src={buildData.videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Game images placeholder */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon name="Image" size={32} className="text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-background text-foreground dark flex">
      {/* Left panel - Elements */}
      <div className="w-64 border-r border-border bg-card p-4 animate-slide-in-right">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Элементы билда</h2>
          <div className="grid grid-cols-1 gap-2">
            {elementTypes.map(({ type, icon, label }) => (
              <Card
                key={type}
                className={`p-3 cursor-pointer transition-colors duration-200 border-border hover:scale-105 transform ${
                  selectedElement === type ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                }`}
                onClick={() => setSelectedElement(type)}
              >
                <div className="flex items-center gap-2">
                  <Icon name={icon as any} size={16} className={selectedElement === type ? 'text-primary-foreground' : 'text-primary'} />
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
            <Button size="sm" variant="outline" className="w-full justify-start">
              <Icon name="Download" size={14} className="mr-2" />
              Экспорт HTML
            </Button>
          </div>
        </div>
      </div>

      {/* Center - Preview */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Редактор билдов</h1>
            <div className="flex gap-2">
              <Badge variant="secondary" className="animate-fade-in">
                Режим редактирования
              </Badge>
              <Button size="sm" className="hover:scale-105 transition-transform">
                <Icon name="Smartphone" size={14} className="mr-2" />
                Мобильная версия
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-gray-900">
          {renderPreview()}
        </div>
      </div>

      {/* Right panel - Settings */}
      <div className="w-80 border-l border-border bg-card p-4 animate-slide-in-right">
        {selectedElement ? (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Icon name="Settings" size={16} className="text-primary" />
              <h2 className="font-semibold">
                Настройки: {elementTypes.find(e => e.type === selectedElement)?.label}
              </h2>
            </div>

            <div className="space-y-4">
              {selectedElement === 'title' && (
                <div>
                  <Label>Заголовок</Label>
                  <Input
                    value={buildData.title}
                    onChange={(e) => updateBuildData('title', e.target.value)}
                    className="mt-2"
                    placeholder="Название игры"
                  />
                </div>
              )}

              {selectedElement === 'subtitle' && (
                <div>
                  <Label>Подзаголовок</Label>
                  <Input
                    value={buildData.subtitle}
                    onChange={(e) => updateBuildData('subtitle', e.target.value)}
                    className="mt-2"
                    placeholder="Версия, глава..."
                  />
                </div>
              )}

              {selectedElement === 'description' && (
                <div>
                  <Label>Описание</Label>
                  <Textarea
                    value={buildData.description}
                    onChange={(e) => updateBuildData('description', e.target.value)}
                    className="mt-2"
                    rows={6}
                    placeholder="Описание игры..."
                  />
                </div>
              )}

              {selectedElement === 'features' && (
                <div>
                  <Label>Особенности (по одной на строку)</Label>
                  <Textarea
                    value={buildData.features.join('\n')}
                    onChange={(e) => updateBuildData('features', e.target.value.split('\n').filter(f => f.trim()))}
                    className="mt-2"
                    rows={4}
                    placeholder="Особенность 1\nОсобенность 2..."
                  />
                </div>
              )}

              {selectedElement === 'video' && (
                <div>
                  <Label>Ссылка на видео (YouTube Embed)</Label>
                  <Input
                    value={buildData.videoUrl}
                    onChange={(e) => updateBuildData('videoUrl', e.target.value)}
                    className="mt-2"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
              )}

              {selectedElement === 'launchDate' && (
                <div>
                  <Label>Дата запуска</Label>
                  <Input
                    value={buildData.launchDate}
                    onChange={(e) => updateBuildData('launchDate', e.target.value)}
                    className="mt-2"
                    placeholder="LAUNCHES JULY 17"
                  />
                </div>
              )}

              {selectedElement === 'steamLink' && (
                <div>
                  <Label>Текст ссылки</Label>
                  <Input
                    value={buildData.steamLink}
                    onChange={(e) => updateBuildData('steamLink', e.target.value)}
                    className="mt-2"
                    placeholder="Then check out the full game on Steam!"
                  />
                </div>
              )}

              {selectedElement === 'background' && (
                <div>
                  <Label>Фоновое изображение (URL)</Label>
                  <Input
                    value={buildData.backgroundImage}
                    onChange={(e) => updateBuildData('backgroundImage', e.target.value)}
                    className="mt-2"
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button 
                    size="sm" 
                    className="w-full mt-2" 
                    variant="outline"
                    onClick={() => updateBuildData('backgroundImage', '/img/626ccac7-1a87-40fd-8e28-ef0e37110edc.jpg')}
                  >
                    <Icon name="Image" size={14} className="mr-2" />
                    Использовать стандартный фон
                  </Button>
                </div>
              )}

              {selectedElement === 'contentBlock' && (
                <>
                  <div>
                    <Label>Цвет фона блока</Label>
                    <Input
                      type="color"
                      value={buildData.contentBlockStyle.backgroundColor.replace('rgba(0, 0, 0, 0.7)', '#000000')}
                      onChange={(e) => updateContentBlockStyle('backgroundColor', `rgba(${parseInt(e.target.value.slice(1,3), 16)}, ${parseInt(e.target.value.slice(3,5), 16)}, ${parseInt(e.target.value.slice(5,7), 16)}, 0.7)`)}
                      className="mt-2 h-10"
                    />
                  </div>
                  <div>
                    <Label>Прозрачность: {Math.round(buildData.contentBlockStyle.opacity * 100)}%</Label>
                    <Slider
                      value={[buildData.contentBlockStyle.opacity * 100]}
                      onValueChange={(value) => updateContentBlockStyle('opacity', value[0] / 100)}
                      min={0}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Скругление углов: {buildData.contentBlockStyle.borderRadius}px</Label>
                    <Slider
                      value={[buildData.contentBlockStyle.borderRadius]}
                      onValueChange={(value) => updateContentBlockStyle('borderRadius', value[0])}
                      min={0}
                      max={50}
                      step={2}
                      className="mt-2"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground animate-fade-in">
            <Icon name="Hand" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Выберите элемент</p>
            <p className="text-sm">для редактирования</p>
            <div className="mt-4 p-3 bg-muted rounded-lg text-left">
              <p className="text-xs text-muted-foreground">
                💡 Кликните на любой элемент в предпросмотре или выберите в левой панели
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildEditor;