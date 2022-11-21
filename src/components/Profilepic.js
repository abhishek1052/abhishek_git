const Profilepic = (props) => {
  var url = "https://avatars.githubusercontent.com/" + props.username;
  if (props.username === "") {
    url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAZlBMVEX///8AAAD8/Pzr6+srKys7Ozs/Pz+EhITOzs75+fl+fn709PTb29s2Njbi4uIvLy9MTEywsLBFRUXV1dVwcHBVVVUQEBAdHR1paWkmJiampqZkZGSTk5O4uLiMjIyamprDw8MXFxe0cMSFAAAC0ElEQVRoge2aC5aiMBBFKaIogo2I+P/Q+9/kyCg2o7SkXp54nMNdgPdIKpWkqjzPEZPmc9ffgIiKnYiMuhf78SSRkrhr8/lby5Wvbs3jifyQdSgOTwOpMw+7MmcTeSCNOhD7h9mj+cxyl2b+S81mO2w0XwgWhXmVObpb5gZW6+Ila59+t5n/kqR0c5i3a6/k5MCLN9ZqkW9qolOpz8tOzDbmWXg3MeUF/EKpFlmz1GO1WmRMcs8Bd8BRfwFq1sG6hdxbilsfaSULirv55GpjxlD72s19Yco4Unv3x7iHH+8OenfvbiXo3b27d3+AG7kii8w//RwzkFqE8CQbT0H30PlZFCWgWiRxrQEY3cu7zsb1q0fYDisJnGsfO9i9c1V7e9i9d3YXsLtwdmOv7xL3Fzi8yQaEMhsabO6h5nkj0M3oohxA94HgRoONUezxl5ibUspv6FFYMGGoobIirbAIuTlq7wioWX1KZJcxdlgJsstofUr9Lluy1J59n6Yip7n1C85a7vOFcaVUr4gNQm1q4yS1C9pIp3bjdenlyFTrHqOU528NzVenzz/Yhxsz0C7YvxHc3wT32Ecbf9Rmbe2m9UJv2HeqKN2pOn7rrMONAXvgI7RWi7DHLd7pfmdu0VyUWX33Cs0pyk1ske4xOiJOuITaNvSMF26pUi3CGyzSV5Jpo5tINZd1WUSGLTijFtjAA+lA0aTTHyiRnoFzHu6zXLH9neGetdsYm8HmaioWeLQbrMpTZ4LZDVLqeOSot0cnvFnxL5uT7mQJU7xF80iSKjbcAW+SNBPY1gIKrBH4nGFhYR6z/3NF0HaVyvRlHXvyZ6kudksl7Sx+S3UG7RBoGDVt9xBvhOnY3284/9SRueRUf7CF2Bgozvb232NmErMjuQad/8p99Rv55bsb+6c1j4Hp3b27d/fu/9Pd/VFyPkyud4i3nCXVZQmfG0LZlX/7D6KbL4O0lEisAAAAAElFTkSuQmCC"

  }
  return (
    <>
    <div className="profile">
    <div className="container">
      <div className="crop">
        <img src={url} alt="" />
      </div>
    </div>
      <i class="fas fa-link"> {"https://github.com/"+props.username}  </i>
    </div>
    </>
  )
}

export default Profilepic