/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Content, Text, Thumbnail } from 'native-base';
import { Image, View, StyleSheet } from 'react-native';

// import default avatar
import User from '../assets/img/avatar.png';

// import dummy image
import Dummy from '../assets/img/home.jpeg';

export default function Detail() {
  return (
    <Container>
      <Content>
        <Image source={Dummy} style={styles.newsImage} />
        <View style={styles.padding}>
          <Text style={[styles.bold, styles.marginBottom_8]}>
            Liga Inggris: James Rodriguez Buka-bukaan Alasan Pernah Tolak Gabung
            Manchester United
          </Text>
          <Text style={[styles.fontSize_14, styles.marginBottom_20]}>
            Bola.com, Liverpool - Striker Everton, James Rodriguez, mengungkap
            fakta menarik menjelang duel melawan Manchester United di Liga
            Inggris, Sabtu (7/11/2020) malam. Ternyata, ia pernah melewatkan
            kans pindah ke klub raksasa Inggris tersebut. \n\nManchester United
            pernah mendekati James Rodriguez delapan tahun lalu, tepatnya pada
            era Sir Alex Ferguson. Saat itu, ia masih merumput di
            Porto.\n\nAlih-alih hijrah ke Inggris, James Rodriguez memilih
            bertahan di Porto, kemudian setahun berselang pindah ke Ligue 1,
            untuk menerima tawaran Monaco. \n\nPada 2014, ia menjelma menjadi
            superstar global di Piala Dunia bersama Timnas Kolombia. Setelah itu
            ia pindah ke Real Madrid pada tahun yang sama. Sayangnya, kariernya
            bersama El Real tak terlalu moncer. \n\nPemain berusia 29 tahun itu
            kini bereuni dengan Carlo Ancelotti di Everton dan kembali menemukan
            performa apiknya. Rodriguez juga dinyatakan fit dan bisa bermain
            melawan United, setelah absen pada laga sebelumnya kontra Newcastle
            United. \n\nMenjelang laga itu, Rodriguez mengenang momen saat
            Manchester United berusaha merekrutnya pada 2012. \n\n\"Peristiwanya
            sudah lama sekali, saya yakin pada 2012. Klub telah menawari saya
            sesuatu, tetapi pada akhirnya tidak terjadi karena suatu alasan yang
            saya tidak tahu,\" ujar James Rodriguez, seperti dilansir Daily
            Star.\n\nMeskipun melewatkan peluang gabung Manchester United, James
            Rodriguez tidak menyesal. Ia merasa memang ditakdirkan untuk klub
            lain. \n\n\"Jika itu tidak terjadi, maka pasti ada beberapa alasan.
            Mungkin saya tidak siap (bermain untuk MU), atau mungkin saya memang
            tercipta untuk bermain dengan tim hebat lainnya,\" ujar Rodriguez.
            \n\n\"Pada akhirnya saya punya peluang pindah ke Prancis dan itu
            jalan yang saya tempuh.\" \n\nKetika ditanya apakah pernah
            bertanya-tanya tentang apa yang bisa terjadi jika bergabung dengan
            United bertahun-tahun yang lalu, Rodriguez menjawab singkat \"Tidak,
            tidak juga,\" ujar Rodriguez. \n\n\"Ketika pindah ke Prancis, saya
            fokus tampil bagus pada tahun itu,\" imbuhnya. \n\nSumber: Daily
            Star
          </Text>
        </View>
        <View style={[styles.author, styles.padding]}>
          <Thumbnail source={User} style={styles.avatar} />
          <View>
            <Text style={[styles.fontSize_14, styles.bold, styles.white]}>
              Written By
            </Text>
            <Text style={[styles.fontSize_12, styles.bold, styles.white]}>
              Muhammad Abdurasyid
            </Text>
            <Text style={[styles.fontSize_12, styles.white]}>1 Nov, 16.00</Text>
          </View>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  fontSize_14: {
    fontSize: 14,
  },
  fontSize_12: {
    fontSize: 12,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#2395FF',
  },
  avatar: {
    marginRight: 10,
  },
  newsImage: {
    resizeMode: 'cover',
    width: '100%',
    height: 175,
    marginBottom: 8,
  },
  marginBottom_8: {
    marginBottom: 8,
  },
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  marginBottom_20: {
    marginBottom: 20,
  },
  white: {
    color: 'white',
  },
});
