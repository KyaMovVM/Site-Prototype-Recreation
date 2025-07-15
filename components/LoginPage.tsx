// @ts-nocheck
import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eye, LogIn, Key, Shield, User } from "lucide-react";
import exampleImage from '/favicon.svg';

interface LoginPageProps {
  language: 'ja' | 'ru' | 'en';
  isUmlOpen: boolean;
  setIsUmlOpen: (open: boolean) => void;
  highContrastMode?: boolean;
}

export default function LoginPage({ language, isUmlOpen, setIsUmlOpen, highContrastMode = false }: LoginPageProps) {
  const [authType, setAuthType] = useState<'password' | 'ssh'>('password');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    sshKey: '',
    mfaCode: ''
  });

  const texts = {
    ja: {
      title: 'システム ログイン',
      subtitle: 'KyaMovVM への認証',
      username: 'ユーザー名',
      password: 'パスワード',
      sshKey: 'SSH キー',
      mfaCode: 'MFA コード',
      authTypePassword: 'パスワード',
      authTypeSsh: 'SSH キー',
      submit: 'ログイン',
      authMethod: '認証方法',
      umlDiagram: 'UML ダイアグラム',
      umlDesc: 'KyaMovVM プロジェクトのアーキテクチャ ダイアグラム',
      placeholderUsername: 'ユーザー名を入力',
      placeholderPassword: 'パスワードを入力',
      placeholderSshKey: 'SSH キーを貼り付け',
      placeholderMfa: 'MFA コードを入力'
    },
    ru: {
      title: 'Вход в систему',
      subtitle: 'Авторизация в KyaMovVM',
      username: 'Имя пользователя',
      password: 'Пароль',
      sshKey: 'SSH ключ',
      mfaCode: 'MFA код',
      authTypePassword: 'Пароль',
      authTypeSsh: 'SSH ключ',
      submit: 'Войти',
      authMethod: 'Метод аутентификации',
      umlDiagram: 'UML Диаграмма',
      umlDesc: 'Архитектурная диаграмма проекта KyaMovVM',
      placeholderUsername: 'Введите имя пользователя',
      placeholderPassword: 'Введите пароль',
      placeholderSshKey: 'Вставьте ваш SSH ключ',
      placeholderMfa: 'Введите MFA код'
    },
    en: {
      title: 'System Login',
      subtitle: 'Authentication to KyaMovVM',
      username: 'Username',
      password: 'Password',
      sshKey: 'SSH Key',
      mfaCode: 'MFA Code',
      authTypePassword: 'Password',
      authTypeSsh: 'SSH Key',
      submit: 'Login',
      authMethod: 'Authentication Method',
      umlDiagram: 'UML Diagram',
      umlDesc: 'Architectural diagram of KyaMovVM project',
      placeholderUsername: 'Enter username',
      placeholderPassword: 'Enter password',
      placeholderSshKey: 'Paste your SSH key',
      placeholderMfa: 'Enter MFA code'
    }
  };

  const t = texts[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', {
      username: formData.username,
      authType,
      mfaCode: formData.mfaCode,
      hasCredentials: authType === 'password' ? !!formData.password : !!formData.sshKey
    });
    // Here you would typically handle the actual authentication
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`min-h-screen-safe px-4 py-8 flex items-center justify-center ${
      highContrastMode 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark'
    }`}>
      {!highContrastMode && (
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src={exampleImage}
            alt="Cyberpunk Background"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              highContrastMode
                ? 'bg-white'
                : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink'
            }`}>
              <LogIn className={`w-8 h-8 ${
                highContrastMode ? 'text-black' : 'text-white'
              }`} />
            </div>
          </div>
          <h1 className={`text-3xl md:text-4xl font-black mb-2 ${
            highContrastMode 
              ? 'text-white' 
              : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent'
          }`}>
            {t.title}
          </h1>
          <p className={`font-medium ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            {t.subtitle}
          </p>
        </div>

        <Card className={`backdrop-blur-sm shadow-2xl ${
          highContrastMode
            ? 'border-4 border-white bg-gray-900/95 shadow-xl'
            : 'border-cyber-cyan/30 bg-cyber-dark-secondary/95 shadow-cyber-cyan/20'
        }`}>
          <CardHeader className="space-y-4">
            <CardTitle className={`text-center flex items-center justify-center space-x-2 ${
              highContrastMode ? 'text-white' : 'text-cyber-cyan'
            }`}>
              <User className="w-5 h-5" />
              <span>{t.authMethod}</span>
            </CardTitle>
            <div className="flex justify-between items-center">
              <Button 
                variant="outline"
                onClick={() => setIsUmlOpen(true)}
                className={`flex items-center text-xs font-medium ${
                  highContrastMode
                    ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                    : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
                }`}
              >
                <Eye className="w-3 h-3 mr-1" />
                UML
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className={`flex items-center space-x-2 font-medium ${
                  highContrastMode ? 'text-white' : 'text-cyber-cyan'
                }`}>
                  <User className="w-4 h-4" />
                  <span>{t.username}</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t.placeholderUsername}
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`font-medium ${
                    highContrastMode
                      ? 'border-2 border-white bg-gray-800 text-white placeholder:text-gray-400 focus:border-white'
                      : 'border-cyber-cyan/30 focus:border-cyber-cyan bg-cyber-dark/50 text-cyber-cyan'
                  }`}
                  required
                />
              </div>

              {/* Authentication Type Selection */}
              <div className="space-y-3">
                <Label className={`flex items-center space-x-2 font-medium ${
                  highContrastMode ? 'text-white' : 'text-cyber-pink'
                }`}>
                  <Key className="w-4 h-4" />
                  <span>{t.authMethod}</span>
                </Label>
                <RadioGroup 
                  value={authType} 
                  onValueChange={(value: 'password' | 'ssh') => setAuthType(value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="password" 
                      id="radio-password"
                      className={highContrastMode ? 'border-white text-white' : ''}
                    />
                    <Label htmlFor="radio-password" className={`cursor-pointer font-medium ${
                      highContrastMode ? 'text-white' : 'text-cyber-cyan'
                    }`}>
                      {t.authTypePassword}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="ssh" 
                      id="radio-ssh"
                      className={highContrastMode ? 'border-white text-white' : ''}
                    />
                    <Label htmlFor="radio-ssh" className={`cursor-pointer font-medium ${
                      highContrastMode ? 'text-white' : 'text-cyber-cyan'
                    }`}>
                      {t.authTypeSsh}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Password Field */}
              {authType === 'password' && (
                <div className="space-y-2">
                  <Label htmlFor="password" className={`flex items-center space-x-2 font-medium ${
                    highContrastMode ? 'text-white' : 'text-cyber-purple'
                  }`}>
                    <Shield className="w-4 h-4" />
                    <span>{t.password}</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.placeholderPassword}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`font-medium ${
                      highContrastMode
                        ? 'border-2 border-white bg-gray-800 text-white placeholder:text-gray-400 focus:border-white'
                        : 'border-cyber-cyan/30 focus:border-cyber-cyan bg-cyber-dark/50 text-cyber-cyan'
                    }`}
                    required
                  />
                </div>
              )}

              {/* SSH Key Field */}
              {authType === 'ssh' && (
                <div className="space-y-2">
                  <Label htmlFor="ssh-key" className={`flex items-center space-x-2 font-medium ${
                    highContrastMode ? 'text-white' : 'text-cyber-purple'
                  }`}>
                    <Key className="w-4 h-4" />
                    <span>{t.sshKey}</span>
                  </Label>
                  <Textarea
                    id="ssh-key"
                    placeholder={t.placeholderSshKey}
                    value={formData.sshKey}
                    onChange={(e) => handleInputChange('sshKey', e.target.value)}
                    className={`min-h-24 font-medium ${
                      highContrastMode
                        ? 'border-2 border-white bg-gray-800 text-white placeholder:text-gray-400 focus:border-white'
                        : 'border-cyber-cyan/30 focus:border-cyber-cyan bg-cyber-dark/50 text-cyber-cyan'
                    }`}
                    required
                  />
                </div>
              )}

              {/* MFA Code */}
              <div className="space-y-2">
                <Label htmlFor="mfa" className={`flex items-center space-x-2 font-medium ${
                  highContrastMode ? 'text-white' : 'text-cyber-neon-green'
                }`}>
                  <Shield className="w-4 h-4" />
                  <span>{t.mfaCode}</span>
                </Label>
                <Input
                  id="mfa"
                  type="text"
                  placeholder={t.placeholderMfa}
                  value={formData.mfaCode}
                  onChange={(e) => handleInputChange('mfaCode', e.target.value)}
                  className={`font-medium ${
                    highContrastMode
                      ? 'border-2 border-white bg-gray-800 text-white placeholder:text-gray-400 focus:border-white'
                      : 'border-cyber-cyan/30 focus:border-cyber-cyan bg-cyber-dark/50 text-cyber-cyan'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className={`w-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  highContrastMode
                    ? 'bg-white text-black hover:bg-gray-200 border-2 border-white'
                    : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink hover:from-cyber-cyan/80 hover:to-cyber-pink/80 text-white border-0'
                }`}
                size="lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {t.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* UML Dialog */}
      <Dialog open={isUmlOpen} onOpenChange={setIsUmlOpen}>
        <DialogContent className={`max-w-4xl max-h-[80vh] overflow-y-auto ${
          highContrastMode
            ? 'border-4 border-white bg-black'
            : 'border-cyber-cyan/20 bg-cyber-dark-secondary'
        }`}>
          <DialogHeader>
            <DialogTitle className={`${
              highContrastMode ? 'text-white' : 'text-cyber-cyan'
            }`}>
              {t.umlDiagram}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop"
              alt="UML Diagram"
              className="w-full rounded-lg"
            />
            <p className={`text-sm mt-4 text-center font-medium ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.umlDesc}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}