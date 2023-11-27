# Демонстрационный вариант cервиса для изучения русской жестовой речи
Проект выполнен в рамках дисциплины "Проектный практикум" студентов 2-3 курсов Уральского федерального 
университета имени первого Президента России Б. Н. Ельцина.

Специально для III Конгресса молодых учённых 2023

## Возможности стенда:
1. Изучение жестов: теория + закрепление практическими заданиями
2. Проверка знаний с помощью распознавания жестов, показываемых обучающимся в камеру

## Инструкция запуска
1. Перейти в папку recognition
2. Установить библиотеки для python
3. Проверить, что все библиотеки в SLT_API.py установлены (Если что-то не установлено, установить вручную)
4. Запустить модель распознавания
5. Перейти к фронтенду
6. Установить пакеты для фронтенда
7. Запустить фронтенд

```bash
cd recognition
pip install -r requirements.txt
python SLT_API.py

cd ../frontend
npm i
npm run start
```

## Иллюстрации
![Home](https://github.com/CatDevelop/Teaching-RSL-Stand/blob/kmu/frontend/src/assets/images/Demo1.png "Teaching-RSL")
![Theory](https://github.com/CatDevelop/Teaching-RSL-Stand/blob/kmu/frontend/src/assets/images/Demo2.png "Teaching-RSL")
![Practice](https://github.com/CatDevelop/Teaching-RSL-Stand/blob/kmu/frontend/src/assets/images/Demo3.png "Teaching-RSL")
![Result](https://github.com/CatDevelop/Teaching-RSL-Stand/blob/kmu/frontend/src/assets/images/Demo4.png "Teaching-RSL")
![Training](https://github.com/CatDevelop/Teaching-RSL-Stand/blob/kmu/frontend/src/assets/images/Demo5.png "Teaching-RSL")
